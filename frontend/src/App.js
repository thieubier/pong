import React from 'react';
import {Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import QuotationList from './components/QuotationList';
import OrderList from './components/OrderList';
import PieceList from './components/PieceList';
import PurchaseList from './components/PurchaseList';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import EditUser from './components/EditUser';
import Profile from './components/Profile';
import Login from './components/Login';
import AddPiece from './components/AddPiece';
import PieceDetail from './components/PieceDetail';
import OperationList from './components/OperationList';
import AddOperation from "./components/AddOperation";
import AddManufacturingRange from './components/AddManufacturingRange';
import ManufacturingRangeList from './components/ManufacturingRangeList';
import ManufacturingRangeDetail from './components/ManufacturingRangeDetail';
import EditManufacturingRange from './components/EditManufacturingRange';
import WorkstationList from "./components/WorkstationList";
import AddWorkstation from "./components/AddWorkstation";
import WorkstationDetail from "./components/WorkstationDetail";
import MachineList from "./components/MachineList";
import MachineDetail from "./components/MachineDetail";
import AddMachine from "./components/AddMachine";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RealizationList from "./components/RealizationList";
import ManufacturingRangeFabricate from "./components/ManufacturingRangeFabricate";

const AppContent = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div>
            {!isLoginPage && <Navbar />}
            <div className={!isLoginPage ? 'content' : 'login-page'}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/quotations" element={<QuotationList />} />
                    <Route path="/orders" element={<OrderList />} />
                    <Route path="/pieces" element={<PieceList />} />
                    <Route path="/pieces/add" element={<AddPiece />} />
                    <Route path="/pieces/:id" element={<PieceDetail />} />
                    <Route path="/purchases" element={<PurchaseList />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:id" element={<UserDetail />} />
                    <Route path="/users/edit/:id" element={<EditUser />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/operations" element={<OperationList />} />
                    <Route path="/operations/add" element={<AddOperation />} />
                    <Route path="/manufacturing-ranges/add" element={<AddManufacturingRange />} />
                    <Route path="/manufacturing-ranges/:id" element={<ManufacturingRangeDetail />} />
                    <Route path="/manufacturing-ranges" element={<ManufacturingRangeList />} />
                    <Route path="/manufacturing-ranges/edit/:id" element={<EditManufacturingRange />} />
                    <Route path="/manufacturing-ranges/fabricate/:id" element={<ManufacturingRangeFabricate />} />
                    <Route path="/workstations" element={<WorkstationList />} />
                    <Route path="/workstations/add" element={<AddWorkstation />} />
                    <Route path="/workstations/:id" element={<WorkstationDetail />} />
                    <Route path="/machines/" element={<MachineList />} />
                    <Route path="/machines/:id" element={<MachineDetail />} />
                    <Route path="/machines/add" element={<AddMachine />} />
                    <Route path="/realizations/" element={<RealizationList />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    );
};

const App = () => {
    return (
            <AppContent />
    );
};

export default App;
