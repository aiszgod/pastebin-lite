import mongoose from 'mongoose';

const pasteSchema = new mongoose.Schema({
  pasteId: { type: String, required: true, unique: true, index: true },
  content: { type: String, required: true },
  ttl_seconds: { type: Number, default: null },
  max_views: { type: Number, default: null },
  view_count: { type: Number, default: 0 },
  expires_at: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

pasteSchema.index({ expires_at: 1 }, { 
  expireAfterSeconds: 0, 
  partialFilterExpression: { expires_at: { $ne: null } } 
});

export default mongoose.models.Paste || mongoose.model('Paste', pasteSchema);
