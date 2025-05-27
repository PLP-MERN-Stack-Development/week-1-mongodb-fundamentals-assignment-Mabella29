// Task 2
//Task 2.1 finding all the books in a specific genre

db.books.find({genre: "Fiction"})

//2.2 Find books published after a certain year
db.books.find({published_year:{$gt:1924}})

//2.3 Find books by a specific author
db.books.find({author: "Harper Lee"})

//2.4 Update the price of a specific book
db.books.updateOne({title: "Pride and Prejudice"},{$set:{price:8.99}})

//2.5 Delete a book by its title
db.books.deleteOne({title:"1984"})

//TASK 3
// 3.1 find books that are both in stock and published after 2010
db.books.find({in_stock: true, published_year:{$gt:2010}})

// 3.2 projection to return only the title, author, and price fields in your queries
db.books.find({},{title:1, price: 1, author:1, _id:0})

// 3.3 sorting to display books by price (both ascending and descending)
db.books.find().sort({price:1})
db.books.find().sort({price:-1})

//3.4 Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find().limit(5).skip(5)

// Task 4(aggregation pipeline)
// 4.1 aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([{$group:{_id:"$genre", avg_price:{$avg: "$price"}}}])

//4.2 aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([{ $group:{_id:"$author", count:{$sum: 1}}},{$sort: {count: -1}}, {$limit: 1}
])

// 4.3 pipeline that groups books by publication decade and counts them
db.books.aggregate([
  { $project: { decade: { $subtract: [ "$published_year", { $mod: [ "$published_year", 10 ] } ] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } }
]);

//5 indexing
//5.1 index on the `title` field for faster searches
db.books.createIndex({title:1})

//5.2 compound index on `author` and `published_year`
db.books.createIndex({author:1, published_year:1})

//5.3 
db.books.find({ author: "Aldous Huxley" }).explain("executionStats");


