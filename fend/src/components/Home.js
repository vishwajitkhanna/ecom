import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import "./home.css";
import Gc from "./Gc";
import { useNavigate } from "react-router-dom";
import Aside from "./Aside";

let Home = () => {
  let [data, setData] = useState([]);
  let obj = useContext(Gc);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/getprod").then((res) => {
      setData(res.data);
    });
  }, []);
  let showDesc = (item) => {
    obj.usercon.oneitem = { ...item };
    navigate("/desc");
  };
  let addcart = (item) => {
    if (obj.usercon.islogin) {
      item = { ...item };
      let pid = item._id;
      delete item._id;
      delete item.comm;
      data = { pid: pid, uid: obj.usercon._id, ...item };
      axios
        .post("http://localhost:5000/addcart", data, {
          headers: { Authorization: obj.usercon.token },
        })
        .then((res) => {});
    } else {
      navigate("/login");
    }
  };

  let upd = (item) => {
    obj.updateusercon({ item: item });
    navigate("/update");
  };
  let del = (_id) => {
    axios
      .delete(`http://localhost:5000/delprod/${_id}`, {
        headers: { Authorization: obj.usercon.token, _id: obj.usercon._id },
      })
      .then(() => {
        axios.get("http://localhost:5000/getprod").then((res) => {
          setData(res.data);
        });
      });
  };
  return (
    <div className="prodcon flex flex-wrap w-full h-full">
      <Aside />
      <div className="ml-56 w-full flex flex-wrap gap-4 pt-8 mb-4">
        {data.map((item, index) => {
          return (
            <div className="card flex flex-col justify-between w-56 h-72 bg-white p-5">
              <div
                className="img w-full h-40 pb-7"
                onClick={() => showDesc(item)}
              >
                <img
                  className="w-full h-full"
                  src={`http://localhost:5000/imgs/${item.img}`}
                />
              </div>
              <h1>${item.price.toFixed(2)}</h1>
              <p>{item.name}</p>
              <button
                className="border bg-rose-300 w-full"
                onClick={() => addcart(item)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <span className="cart-item">
          {/* {obj.data.length > 0 && obj.data.length} */}
        </span>
      </div>
    </div>
  );
};
export default Home;
