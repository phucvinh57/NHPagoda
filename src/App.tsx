// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
// import "./App.css";

// function App() {
//   const [greetMsg, setGreetMsg] = useState("");
//   const [name, setName] = useState("");

//   async function greet() {
//     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//     setGreetMsg(await invoke("greet", { name }));
//   }

//   return (
//     <div className="container">
//       <h1>Welcome to Tauri!</h1>

//       <div className="row">
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo vite" alt="Vite logo" />
//         </a>
//         <a href="https://tauri.app" target="_blank">
//           <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>

//       <p>Click on the Tauri, Vite, and React logos to learn more.</p>

//       <div className="row">
//         <div>
//           <input
//             id="greet-input"
//             onChange={(e) => setName(e.currentTarget.value)}
//             placeholder="Enter a name..."
//           />
//           <button type="button" onClick={() => greet()}>
//             Greet
//           </button>
//         </div>
//       </div>
//       <p>{greetMsg}</p>
//     </div>
//   );
// }

// export default App;

import { SidebarWidth } from "@constants";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { PersonInfoPage, PrinterPage } from "@pages";
import { Sidebar } from "@components";

export default function App() {
  const [sidebarCollapse, setSidebarCollapse] = useState(true);

  return (
    <div>
      <Sidebar toggle={() => setSidebarCollapse(!sidebarCollapse)} collapse={sidebarCollapse} />

      <div id='main' style={{ marginLeft: `${sidebarCollapse ? SidebarWidth.COLLAPSE : SidebarWidth.EXPAND}px` }}>
        <Routes>
          <Route path='/persons' element={<PersonInfoPage />} />
          <Route path='/' element={<PersonInfoPage />} />
          <Route path='/printer' element={<PrinterPage />} />
        </Routes>
      </div>
    </div>
  );
}
