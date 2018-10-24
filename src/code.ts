import { map } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

let observable = Observable.create((observer: any) => {
  try {
    observer.next("hello");
    observer.next("how are you");
    setInterval(()=> {
        observer.next('I am good');
    }, 2000);
  } catch (err) {
    observer.error(err);
  }
});

let observer = observable.subscribe(
  (x: any) => addItem(x),
  (error: any) => addItem("error:" + error),
  () => addItem("complete")
);

let observer2 = observable.subscribe(
    (x: any) => addItem(x)
);

observer.add(observer2);

setTimeout(() => {
    observer.unsubscribe();
}, 6001);

function addItem(val: any) {
  let node = document.createElement("li");
  let textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}
