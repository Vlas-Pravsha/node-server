import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const userFavoritesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
});

const articleCategorySchema = new mongoose.Schema({
  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  category_name: { type: String, required: true },
});

const Article = mongoose.model('Article', articleSchema);
const UserFavorites = mongoose.model(
  'UserFavorites',
  userFavoritesSchema
);
const ArticleCategory = mongoose.model(
  'ArticleCategory',
  articleCategorySchema
);

export { Article, UserFavorites, ArticleCategory };