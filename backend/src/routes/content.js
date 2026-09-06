const express = require('express');
const { requireAdmin } = require('../lib/auth');
const contentStore = require('../lib/contentStore');

const router = express.Router();

// The sections a given site knows how to merge. Anything else is rejected so
// a stray (or malicious) section can't be written to the store.
const VALID_SECTIONS = ['brand', 'destinations', 'experiences', 'journeys', 'gallery'];

// Public — the frontend pulls this to layer CMS edits over its defaults.
router.get('/api/content', async (_req, res) => {
  try {
    const content = await contentStore.readAll();
    res.json({ content });
  } catch (err) {
    console.error('[content] failed to load content:', err.message);
    res.status(500).json({ error: 'Failed to load content.' });
  }
});

// Admin — writes an entire section. The admin UI always sends the *effective*
// content (defaults merged with anything previously saved), so this never
// silently drops items the admin didn't touch.
router.put('/api/admin/content/:section', requireAdmin, async (req, res) => {
  const { section } = req.params;
  if (!VALID_SECTIONS.includes(section)) {
    return res.status(400).json({ error: `Unknown section. Valid sections: ${VALID_SECTIONS.join(', ')}` });
  }

  const data = req.body && req.body.data;
  if (data === undefined || data === null || typeof data !== 'object') {
    return res.status(400).json({ error: 'Expected a JSON object or array under { data }.' });
  }

  try {
    await contentStore.saveSection(section, data);
    res.json({ ok: true, section });
  } catch (err) {
    console.error(`[content] failed to save ${section}:`, err.message);
    res.status(500).json({ error: 'Failed to save content.' });
  }
});

// Admin — removes a saved section so the site falls back to its defaults.
router.delete('/api/admin/content/:section', requireAdmin, async (req, res) => {
  const { section } = req.params;
  if (!VALID_SECTIONS.includes(section)) {
    return res.status(400).json({ error: `Unknown section. Valid sections: ${VALID_SECTIONS.join(', ')}` });
  }

  try {
    await contentStore.deleteSection(section);
    res.json({ ok: true, section });
  } catch (err) {
    console.error(`[content] failed to delete ${section}:`, err.message);
    res.status(500).json({ error: 'Failed to delete content.' });
  }
});

module.exports = router;