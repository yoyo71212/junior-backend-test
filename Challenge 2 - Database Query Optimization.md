# Challenge 2: Database Query Optimization
## SQL Query
```
SELECT id, name, category, price, quantity
FROM Product
WHERE price between 50 and 200
ORDER BY price ASC
LIMIT 10 OFFSET 0;
```

Note: `OFFSET 0` is used as a placeholder; the `OFFSET` should be calculated in the code using the following formula:\
`(page - 1) * 10` where `page` is the current page and `10` is the limit per page.

## NoSQL Query
```
const page = Math.max(1, parseInt(req.query.page) || 1);
const limit = 5;
Product.find({ category: "Electronics" })
        .sort({ price: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("_id name category price quantity");
```
Note: `{ category: "Electronics" }` is a placeholder, in code it should be `{ category }` or `{ category: category }`

## Optimizations
### 1. Using an Index
For the first query (SQL), an index on price can be created to optimize the filtering and sorting operations by avoiding full table scans. The index can be created like so:\
`CREATE INDEX idx_product_price ON Product(price);`

As for the second query (NoSQL), a compound index on the category and price can be used to improve the filtering and sorting by scanning only matching indexed documents instead of the entire collection. This can be done like so:\
`Product.createIndex({ category: 1, price: -1 });`

### 2. Caching
Caching frequent queries or common filter results using Redis to reduce repeated database reads and improve response time.

### 3. Returned Fields
To reduce overhead and improve query performance, only the required fields can be returned instead of `SELECT *` or returning full documents.

### 4. Optimizing Pagination
For larger datasets, cursor based pagination can be more efficient than offset based pagination. This is because offset based pagination still processes skipped rows until it reaches the current page, but cursor based pagination avoids scanning skipped rows. This makes cursor based pagination the more efficient option for large datasets or high traffic systems.