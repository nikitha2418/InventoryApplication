import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";
import VendorMenu from './Components/LoginComponent/VendorMenu';
import ManagerMenu from './Components/LoginComponent/ManagerMenu';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import ShowSingleUser from './Components/LoginComponent/ShowSingleUser';
import SKUAddition from './Components/SKUComponent/SKUAddition';
import SKUReport from './Components/SKUComponent/SKUReport';
import SKUUpdate from './Components/SKUComponent/SKUUpdate';
import ProductAddition from './Components/ProductComponent/ProductAddition';
import ViewProduct from './Components/ProductComponent/ViewProduct';
import EditStock from './Components/ProductComponent/EditStock';
import EditPrice from './Components/ProductComponent/EditPrice';
import ProductReport from './Components/ProductComponent/ProductReport';
import TransactionReport from './Components/ProductComponent/TransactionReport';
import AllProductAnalysis from './Components/ProductComponent/AllProductAnalysis';
import SingleProductDemand from './Components/ProductComponent/SingleProductDemand';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path="/Register" element={<RegisterUser/>}/>
        <Route path='/ShowSingleUser' element={<ShowSingleUser />} />
        <Route path="/AdminMenu" element={<AdminMenu/>}/>
        <Route path="/ManagerMenu" element={<ManagerMenu/>}/>
        <Route path='/VendorMenu' element={<VendorMenu/>} />
        <Route path='/SkuAdd' element={<SKUAddition/>} />
        <Route path='/SkuRepo' element={<SKUReport/>} />
        <Route path='/update-sku/:id' element={<SKUUpdate/>} />
        <Route path='/ProductAdd' element={<ProductAddition/>} />
        <Route path= "/view-product/:pid" element={<ViewProduct/>} ></Route>
        <Route path='/edit-stock/:pid' element={<EditStock />} ></Route>
        <Route path="/edit-price/:pid" element={<EditPrice />}></Route>
        <Route path="/ProdRepo" element={<ProductReport />}></Route>
        <Route path="/TransRepo/:type" element={<TransactionReport/>} />
        <Route path='/all-products' element={<AllProductAnalysis/>} />
        <Route path='/prod-demand/:pid' element={<SingleProductDemand />} />

        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;