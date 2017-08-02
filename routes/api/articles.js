/*
 * get all articles
 * {
 *   method: 'GET',
 *   url: '/api/articles'
 * }
 */
exports.getAllArticles = function(req, res, next){
	req.collections.articles.find({}).toArray(function(error, articles){
		if(error)
			return next(error);
		res.send({articles:articles});
	});
};
/*
 * post article
 * {
 *   method:'POST',
 *   url: '/api/articles'
 * }
 */
exports.postArticle = function(req, res, next){
	if(!req.body.article)
		return next(new Error('No article payload.'));

	if(!req.body.article.title || 
			!req.body.article.slug || 
			!req.body.article.text)
		return next(new Error('Please fill title, slug and text.'));

	let article = req.body.article;
	article.published = false;
	req.collections.articles.insert(article, function(error, articleResponse){
		if(error)
			return next(error);
		res.send(articleResponse);
	});
};

/*
 * Edit article by id
 * {
 *   method: 'PUT',
 *   url: '/api/articles/:id'
 * }
 */
exports.editArticleById = function(req, res, next){
	if(!req.params.id)
		return next(new Error('No article ID.'));

	req.collections.articles.updateById(req.params.id, {$set: req.body.article}, function(error, count){
		if(error)
			return next(error);

		res.send({affectedCount: count});
	});
};

/*
 * delete article by id
 * {
 *   method: 'DELETE',
 *   url: '/api/articles/:id'
 * }
 */
exports.delArticleById = function(req, res, next){
	if(!req.params.id)
		return next(new Error('No article ID.'));

	req.collections.articles.removeById(req.params.id, function(error, count){
		if(error)
			return next(error);
		res.send({affectedCount: count});
	});
};