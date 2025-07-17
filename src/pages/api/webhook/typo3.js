export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Verify webhook secret
  const webhookSecret = req.headers['x-webhook-secret'];
  if (webhookSecret !== process.env.TYPO3_WEBHOOK_SECRET) {
    return res.status(401).json({ message: 'Invalid webhook secret' });
  }

  try {
    const { action, pageId, slug, language } = req.body;

    // Determine which paths to revalidate based on the action
    let pathsToRevalidate = ['/'];

    if (slug) {
      // Revalidate the specific page
      pathsToRevalidate.push(`/${slug}`);

      // Revalidate language variations
      if (language && language !== 'de') {
        pathsToRevalidate.push(`/${language}/${slug}`);
      }
    }

    // Revalidate all language homepages
    const languages = ['en', 'us', 'it', 'fr', 'pl'];
    languages.forEach(lang => {
      pathsToRevalidate.push(`/${lang}`);
    });

    // Trigger revalidation for all paths
    const revalidationPromises = pathsToRevalidate.map(async (path) => {
      try {
        await res.revalidate(path);
        console.log(`Revalidated: ${path}`);
        return { path, success: true };
      } catch (error) {
        console.error(`Failed to revalidate ${path}:`, error);
        return { path, success: false, error: error.message };
      }
    });

    const results = await Promise.all(revalidationPromises);

    return res.json({
      success: true,
      message: `Webhook processed for ${action}`,
      revalidated: results.filter(r => r.success).map(r => r.path),
      failed: results.filter(r => !r.success).map(r => r.path)
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
