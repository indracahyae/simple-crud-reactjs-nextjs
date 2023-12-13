// export default function Page() {
//   return <h1>Hello, Next.js!</h1>;
// }
"use client";
import { Component, createRef } from "react";
import "../public/app.css";

// interface
interface tasks {
  name: string;
  address: string;
}

type myProps = {};

type myState = {
  act: number;
  index: number;
  datas: tasks[];
};

class App extends Component<myProps, myState> {
  state = {
    act: 0,
    index: 0,
    datas: [],
  };

  //   ref
  inputNameRef = createRef();
  inputAddressRef = createRef();
  myFormRef = createRef();

  componentDidMount() {
    console.log("did mount");
    this.inputNameRef.current.focus();
  }

  fSubmit = (e) => {
    e.preventDefault();

    let { datas, act, index } = this.state;
    let name = this.inputNameRef.current.value;
    let address = this.inputAddressRef.current.value;

    if (act === 0) {
      //new
      let data = {
        name,
        address,
      };
      datas.push(data);
    } else {
      //update
      datas[index].name = name;
      datas[index].address = address;
    }

    this.setState({
      datas,
      act: 0,
    });

    this.myFormRef.current.reset();
    this.inputNameRef.current.focus();
  };

  fRemove = (i) => {
    let { datas } = this.state;
    datas.splice(i, 1);
    this.setState({
      datas,
    });

    this.myFormRef.current.reset();
    this.inputNameRef.current.focus();
  };

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.inputNameRef.current.value = data.name;
    this.inputAddressRef.current.value = data.address;

    this.setState({
      act: 1,
      index: i,
    });

    this.inputNameRef.current.focus();
  };

  render() {
    let { datas } = this.state;
    return (
      <div className="App">
        <h2>React Simple CRUD Application</h2>
        <form ref={this.myFormRef} className="myForm">
          <input
            type="text"
            ref={this.inputNameRef}
            placeholder="your name"
            className="formField"
          />
          <input
            type="text"
            ref={this.inputAddressRef}
            placeholder="your address"
            className="formField"
          />
          <button onClick={(e) => this.fSubmit(e)} className="myButton">
            submit{" "}
          </button>
        </form>
        <pre>
          {datas.map((data, i) => (
            <li key={i} className="myList">
              {i + 1}. {data.name}, {data.address}
              <button onClick={() => this.fRemove(i)} className="myListButton">
                remove{" "}
              </button>
              <button onClick={() => this.fEdit(i)} className="myListButton">
                edit{" "}
              </button>
            </li>
          ))}
        </pre>
      </div>
    );
  }
}

export default App;
