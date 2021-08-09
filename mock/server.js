const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json')) // 今回のようにmockディレクトリ作成して別のフォルダでmock起動するときは必要
const middlewares = jsonServer.defaults()


server.use(jsonServer.rewriter({
  "/api/*": "/$1" // /api/soccer -> /soccer
}))

server.use(middlewares)

server.use(router)

router.render = (req, res) => {
  res.locals.data.forEach(element => {
    element.createdAt = new Date().toLocaleString('ja');  // レスポンスデータ加工
  });

  res.send(res.locals.data)
};

server.listen(3000, () => {
  console.log('JSON Server is running')
})
