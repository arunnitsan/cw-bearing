export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // Get the path to revalidate
    const path = req.query.path || '/';

    // Revalidate the specific path
    await res.revalidate(path);

    // Also revalidate the homepage and language variations
    const pathsToRevalidate = [
      '/',
      '/en',
      '/us',
      '/it',
      '/fr',
      '/pl'
    ];

    // Revalidate all language variations
    for (const revalidatePath of pathsToRevalidate) {
      try {
        await res.revalidate(revalidatePath);
      } catch (error) {
        console.error(`Error revalidating ${revalidatePath}:`, error);
      }
    }

    return res.json({
      revalidated: true,
      path,
      message: `Revalidated ${path} and language variations`
    });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
