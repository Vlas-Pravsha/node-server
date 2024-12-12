import { Article } from '../models/articleModel.js';

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find().populate(
      'user_id',
      'username email'
    );

    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

const getCurrentUsersArticle = async (req, res) => {
  const articles = await Article.find({ user_id: req.user.id });

  if (!articles) {
    res.status(404);
    throw new Error('Articles not found');
  }

  res.status(200).json(articles);
};

const createArticle = async (req, res) => {
  try {
    const { title, description, category, image, user_id, author } =
      req.body;

    // Validate all required fields
    if (!title || !description || !category || !image || !user_id) {
      return res.status(400).json({
        error:
          'All fields (title, description, category, image, user_id) are required',
      });
    }

    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ error: 'User not authenticated' });
    }

    const article = await Article.create({
      title,
      description,
      category,
      image,
      user_id,
      author: {
        id: author.id,
        name: author.name,
        avatar: author.avatar || '', // Optional avatar
      },
    });

    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to create the article',
      details: error.message,
    });
  }
};

const getSingleArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(404);
    throw new Error('Article not found');
  }

  res.status(200).json(article);
};

const updateSingleArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(404);
    throw new Error('Article not found');
  }

  if (article.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('You are not authorized to update this article');
  }

  const updatedArticle = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedArticle);
};

const deleteSingleArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      res.status(404);
      throw new Error('Article not found');
    }

    if (article.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error(
        'You are not authorized to delete this article'
      );
    }

    await Article.deleteOne({ _id: req.params.id });

    res
      .status(200)
      .json({ message: 'Article successfully deleted', article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllArticles,
  getCurrentUsersArticle,
  createArticle,
  getSingleArticle,
  updateSingleArticle,
  deleteSingleArticle,
};
