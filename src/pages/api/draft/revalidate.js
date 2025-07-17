export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  const validSecrets = [
    process.env.DRAFT_REVALIDATION_SECRET,
    process.env.NEXT_PUBLIC_DRAFT_REVALIDATION_SECRET,
    'dev-secret' // Development fallback
  ].filter(Boolean); // Remove undefined values

  if (!validSecrets.includes(req.query.secret)) {
    return res.status(401).json({
      message: 'Invalid draft token',
      hint: 'Set DRAFT_REVALIDATION_SECRET environment variable'
    });
  }

  try {
    // Get the path to revalidate
    const path = req.query.path || '/';
    const isDraftMode = req.query.draft === 'true';

    // For draft mode, force immediate revalidation
    if (isDraftMode) {
      // Only revalidate the specific path for faster response
      try {
        await res.revalidate(path);
        console.log(`Draft revalidation successful for: ${path}`);
      } catch (error) {
        console.error(`Draft revalidation failed for ${path}:`, error);
      }

      // For draft mode, only revalidate current path and homepage
      const pathsToRevalidate = [path];
      if (path !== '/') {
        pathsToRevalidate.push('/');
      }

      const revalidationPromises = pathsToRevalidate.map(async (revalidatePath) => {
        try {
          await res.revalidate(revalidatePath);
          return { path: revalidatePath, success: true };
        } catch (error) {
          console.error(`Failed to revalidate ${revalidatePath}:`, error);
          return { path: revalidatePath, success: false, error: error.message };
        }
      });

      const results = await Promise.all(revalidationPromises);

      return res.json({
        revalidated: true,
        path,
        isDraftMode: true,
        results: results.filter(r => r.success).map(r => r.path),
        failed: results.filter(r => !r.success).map(r => r.path),
        message: `Draft revalidation completed for ${path}`
      });
    }

    // Regular revalidation for non-draft mode
    await res.revalidate(path);

    return res.json({
      revalidated: true,
      path,
      isDraftMode: false,
      message: `Revalidated ${path}`
    });

  } catch (err) {
    console.error('Draft revalidation error:', err);
    return res.status(500).json({
      error: 'Error revalidating',
      details: err.message
    });
  }
}
