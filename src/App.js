import './App.css';
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom'

function Home() {
  const history = useHistory()

  // 点击打开弹框
  function handleShowDialog() {
    history.push('/dialog')
  }

  return <>
    <div>Home</div>
    <span style={{ color: '#00f', cursor: 'pointer' }} onClick={handleShowDialog}>Dialog</span>
  </>
}

function About() {
  return <div>About</div>
}

// 弹框组件
function Dialog(props) {
  const history = useHistory()

  // 渲染弹框内容
  function DialogContent() {
    return <div className="dialog-content">{props.children}</div>;
  }

  // 弹框关闭事件
  function onClose() {
    history.go(-1)
    props?.onClose()
  }

  // 将弹框渲染到 body
  return ReactDOM.createPortal(
    <Route path={props.path}>
      <div className="dialog" onClick={onClose}>
        <DialogContent />
      </div>
    </Route>,
    document.body
  )
}

function App() {
  function onClose() {
    console.log('弹框关闭了~')
  }

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Dialog path="/dialog" onClose={onClose}>我是弹框内容，点我可以关闭啦~</Dialog>
    </>
  );
}

export default App;
