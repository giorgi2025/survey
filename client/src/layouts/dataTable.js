import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {connect} from 'react-redux';
import axios from 'axios';
import { BASIC_URL } from '../config/config';



export class Datatable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            CSVData:[]
        }
    }
    componentWillMount(){
        axios
        .post(BASIC_URL+"/getSurveyData")
        .then(res => {
            if(res.data.success === true) {
                var data = res.data.data;
                data.map((row,index) => { 
                    var symptomsTypes = '';
                    var asset = '';
                    var all = '';
                    var diseases = '';
                    var group = '';
                    if(row.mainSourceIncome === 'Negocio Propio' || row.mainSourceIncome === 'Trabajador/a Independiente'){
                        group = 'Independiente'
                    }
                    if(row.mainSourceIncome === 'Funcionario/a Publico (no incluye personal de Blanco)' || row.mainSourceIncome === 'Empleado/a Sector Privado'){
                        group = 'Empleados'
                    }  
                    if(row.mainSourceIncome === 'Comisionista/Vendedor' || row.mainSourceIncome === 'Vendedor ambulante/ Vendedor en casilla' || row.mainSourceIncome === 'Vendedor en marcado, macatero, artesano' ||row.mainSourceIncome === 'Chofer, Taxista' ||row.mainSourceIncome === 'Personal de Obra, Jardinero, Ayudante' ||row.mainSourceIncome === 'Empleada Domestica' ||row.mainSourceIncome === 'Costurero/a' ||row.mainSourceIncome === 'Tecnico independiente' || row.mainSourceIncome === 'Lomitero, asadero panchero'){
                        group = 'Jornaleros'
                    }  
                    if(row.mainSourceIncome === 'Personal del Sistema de Salud (Incluye administrativos)'){
                        group = 'SectorSalud'
                    }
                    if(row.mainSourceIncome === 'Desempleado/a'){
                        group = 'Desempleados'
                    }
                    if(row.mainSourceIncome === 'Jubilado/a'){
                        group = 'Jubilados'
                    }            
                    for(let i = 0 ; i < row.symptomsType.length ; i++){
                        symptomsTypes = symptomsTypes + row.symptomsType[i] +","
                    }
                    for(let i = 0 ; i < row.asset.length ; i++){
                        asset = asset + row.asset[i] +","
                    }
                    for(let i = 0 ; i < row.houseMembersList.length ; i++){
                        var mem = row.houseMembersList[i].relation + "-" + row.houseMembersList[i].age
                        all = all + mem + ","
                    }
                    for( let i = 0 ; i < row. diseaseMembersList.length ; i++){
                        var disease = row. diseaseMembersList[i].relation + "-" + row. diseaseMembersList[i].age +"-"+ row. diseaseMembersList[i].disease 
                        diseases = diseases + disease + ","
                    }
                    Object.assign(row,{group:group})
                    Object.assign(row,{symptomsTypes:symptomsTypes})
                    Object.assign(row,{assets:asset})
                    Object.assign(row,{houseMembersLists:all})
                    Object.assign(row,{diseaseMembersLists:diseases})
                })
                this.setState({data:data})
            } else {                                
            }

        })
        .catch(err => console.log(err));
    }
    download = () =>{
        axios({url:BASIC_URL+"/exportCSV",
        method: 'POST',
        responseType: 'blob' // important
        }).then(response => {       
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.csv');
            document.body.appendChild(link);
            link.click();                  
            
        })
        .catch(err => console.log(err));
    }
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    render() {
        if(!this.props.isLogin){
            window.location = '/'
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const { data } = this.state
        var relativeData = [];
        var relativeColumn = [];
        var illData = [];
        var illColumn = [];
        var susData = [];
        var susColumn = [];
        var thirdColumn = [];
        var thirdData = [];
        var generalData = [];
        var generalColumn = [];
        var fullData = [];
        var fullColumn = [];
        for(let i = 0 ; i < data.length; i++){            
            for(let j = 0 ; j < data[i].houseMembersList.length ; j++){           
                let newrow;
                newrow = {
                    No:i+1,
                    relation:data[i].houseMembersList[j].relation,
                    age:data[i].houseMembersList[j].age,
                    ID:data[i].houseMembersList[j].idNumber,
                    DaddyID:data[i].idNumber,
                    Group:data[i].group
                    // status:users[i].approved ?<button onClick={()=>{this.handleCloseRow(users[i]._id)}} style={{padding:"0px"}} className="btn btn-secondary btn-sm btn-delete mb-0 b-r-4" style={{paddingLeft:"15px",paddingRight:"15px"}}>{"ACTIVE"}</button>:<button onClick={()=>{this.handleCloseRow(users[i]._id)}} className="btn btn-primary btn-sm btn-delete mb-0 b-r-4">{"INACTIVE"}</button>,

                }
                relativeData.push(newrow);
            }           
        }  
        for (var key in relativeData[0]) {   
            let editable = null
            let width = 150
            let visible = {
                textAlign: 'center'
            }     
            relativeColumn.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: visible,
                    width:width
                });
        } 
        for(let i = 0 ; i < data.length; i++){            
            for(let j = 0 ; j < data[i].diseaseMembersList.length ; j++){           
                let newrow;
                newrow = {
                    No:i+1,
                    relation:data[i].diseaseMembersList[j].relation,
                    age:data[i].diseaseMembersList[j].age,
                    Illness:data[i].diseaseMembersList[j].disease,
                    DaddyID:data[i].idNumber,
                    Group:data[i].group,
                    suspicious:''
                    // status:users[i].approved ?<button onClick={()=>{this.handleCloseRow(users[i]._id)}} style={{padding:"0px"}} className="btn btn-secondary btn-sm btn-delete mb-0 b-r-4" style={{paddingLeft:"15px",paddingRight:"15px"}}>{"ACTIVE"}</button>:<button onClick={()=>{this.handleCloseRow(users[i]._id)}} className="btn btn-primary btn-sm btn-delete mb-0 b-r-4">{"INACTIVE"}</button>,

                }
                illData.push(newrow);
            }           
        }  
        for (var key in illData[0]) {   
            let editable = null
            let width = 130
            let visible = {
                textAlign: 'center'
            }     
            illColumn.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: visible,
                    width:width
                });
        } 
        for(let i = 0 ; i < data.length; i++){          
            if(data[i].symptomsType.length >= 3){
                var flag = false;
                for(let j = 0 ; j < data[i].symptomsType.length ; j++){     
                    if(data[i].symptomsType[j] === 'Ninguno')  {
                        flag = true
                    }
                }
                if(flag === false){
                    let newrow;
                    newrow = {
                        No:i+1,
                        DaddyID:data[i].idNumber,
                        Name:data[i].firstName,
                        Surname:data[i].lastName,
                        cellPhone:data[i].cellPhoneNumber,
                        Neigborhood:data[i].neighborhood ,
                        whatsappLink:'https://wa.me/' + data[i].cellPhoneNumber
                        // status:users[i].approved ?<button onClick={()=>{this.handleCloseRow(users[i]._id)}} style={{padding:"0px"}} className="btn btn-secondary btn-sm btn-delete mb-0 b-r-4" style={{paddingLeft:"15px",paddingRight:"15px"}}>{"ACTIVE"}</button>:<button onClick={()=>{this.handleCloseRow(users[i]._id)}} className="btn btn-primary btn-sm btn-delete mb-0 b-r-4">{"INACTIVE"}</button>,
    
                    }
                    susData.push(newrow);
                }   
            }          
        }  
        for (var key in susData[0]) {   
            let editable = null
            let width = 130
            let visible = {
                textAlign: 'center'
            }     
            if(key == 'Id'){
                width = 20
            }
            susColumn.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: visible,
                    width:width
                });
        } 
        for(let i = 0 ; i < data.length; i++){          
            if(data[i].suspectedCase === 'Si'){

                    let newrow;
                    newrow = {
                        No:i+1,
                        DaddyID:data[i].idNumber,
                        Name:data[i].firstName,
                        Surname:data[i].lastName,
                        cellPhone:data[i].cellPhoneNumber,
                        Neigborhood:data[i].neighborhood ,
                        whatsappLink:'https://wa.me/' + data[i].cellPhoneNumber
                        // status:users[i].approved ?<button onClick={()=>{this.handleCloseRow(users[i]._id)}} style={{padding:"0px"}} className="btn btn-secondary btn-sm btn-delete mb-0 b-r-4" style={{paddingLeft:"15px",paddingRight:"15px"}}>{"ACTIVE"}</button>:<button onClick={()=>{this.handleCloseRow(users[i]._id)}} className="btn btn-primary btn-sm btn-delete mb-0 b-r-4">{"INACTIVE"}</button>,
    
                    }
                    thirdData.push(newrow);
                  
            }          
        }  
        for (var key in thirdData[0]) {   
            let editable = null
            let width = 130
            let visible = {
                textAlign: 'center'
            }     
            if(key == 'Id'){
                width = 20
            }
            thirdColumn.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: visible,
                    width:width
                });
        } 
        for(let i = 0 ; i < data.length; i++){          
                    let newrow;
                    newrow = {
                        No:i+1,
                        Name:data[i].firstName,
                        Surname:data[i].lastName,
                        cellPhone:data[i].cellPhoneNumber,
                        Neigborhood:data[i].neighborhood ,
                        address:data[i].address,
                        liveInHome:data[i].liveInHome,
                        houseMaterial:data[i].houseMaterial,
                        floor:data[i].floor,
                        roof:data[i].roof,
                        bathRoom:data[i].bathroom,
                        water:data[i].water,
                        cooking:data[i].cooking,
                        guarani:data[i].guarani,
                        suspectedCase:data[i].suspectedCase,
                        suffering:data[i].suffering,
                        foreignCountry:data[i].foreignCountry,
                        regularVisitors:data[i].regularVisitors,
                        DaddyID:data[i].idNumber,
                        diseaseMembers:data[i].diseaseMembers
                    
                        // status:users[i].approved ?<button onClick={()=>{this.handleCloseRow(users[i]._id)}} style={{padding:"0px"}} className="btn btn-secondary btn-sm btn-delete mb-0 b-r-4" style={{paddingLeft:"15px",paddingRight:"15px"}}>{"ACTIVE"}</button>:<button onClick={()=>{this.handleCloseRow(users[i]._id)}} className="btn btn-primary btn-sm btn-delete mb-0 b-r-4">{"INACTIVE"}</button>,
    
                    }
                    generalData.push(newrow);
              
                     
        }  
        for (var key in generalData[0]) {   
            let editable = null
            let width = 130
            let visible = {
                textAlign: 'center'
            }     
            if(key == 'Id'){
                width = 20
            }
            generalColumn.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: visible,
                    width:width
                });
        } 
        
        for(var i = 0; i < data.length; i++) {
            let newrow;
            newrow = {
                No:i+1,
                group:data[i].group,
                Name:data[i].firstName,
                Surname:data[i].lastName,
                cellPhone:data[i].cellPhoneNumber,
                Neigborhood:data[i].neighborhood ,
                address:data[i].address,
                liveInHome:data[i].liveInHome,
                houseMaterial:data[i].houseMaterial,
                floor:data[i].floor,
                roof:data[i].roof,
                bathRoom:data[i].bathroom,
                water:data[i].water,
                cooking:data[i].cooking,
                guarani:data[i].guarani,
                suspectedCase:data[i].suspectedCase,
                suffering:data[i].suffering,
                foreignCountry:data[i].foreignCountry,
                regularVisitors:data[i].regularVisitors,
                DaddyID:data[i].idNumber,
                diseaseMembers:data[i].diseaseMembers,
                mainSourceIncome:data[i].mainSourceIncome,
                whatCategoryDoes:data[i].whatCategoryDoes,
                expectIPSWhatCategoryDoes:data[i].expectIPSWhatCategoryDoes,
                loseJobWhatCategoryDoes:data[i].loseJobWhatCategoryDoes,
                guaraniEnterWhatCategoryDoes:data[i].guaraniEnterWhatCategoryDoes,
                workplaceWhatCategoryDoes:data[i].workplaceWhatCategoryDoes,
                shareWorkplaceWhatCategoryDoes:data[i].shareWorkplaceWhatCategoryDoes,
                commentMayerWhatCategoryDoes:data[i].commentMayerWhatCategoryDoes,
                weight:data[i].weight,
                date:data[i].date,
                symptomsType:data[i].symptomsTypes,
                asset:data[i].assets,
                houseMembersList:data[i].houseMembersLists,
                diseaseMembersList:data[i].diseaseMembersLists           
                // status:users[i].approved ?<button onClick={()=>{this.handleCloseRow(users[i]._id)}} style={{padding:"0px"}} className="btn btn-secondary btn-sm btn-delete mb-0 b-r-4" style={{paddingLeft:"15px",paddingRight:"15px"}}>{"ACTIVE"}</button>:<button onClick={()=>{this.handleCloseRow(users[i]._id)}} className="btn btn-primary btn-sm btn-delete mb-0 b-r-4">{"INACTIVE"}</button>,

            }
            fullData.push(newrow);
        }
        const columns = [];
        for (var key in fullData[0]) {

            let editable = null
            let width = 200
            let visible = {
                textAlign: 'center'
            }

            fullColumn.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: visible,
                    width:width
                });
        }
        return (
            <Fragment>
                <button onClick={this.download} style={{marginLeft:"30px",marginBottom:"10px",padding:"10px",border:"1px solid blue",color:"blue"}}>Download EXCEL</button>
                <div style={{marginTop:"20px"}}>
                    <ReactTable
                        data={fullData}
                        columns={fullColumn}
                        defaultPageSize={10}
                        className={'-striped -highlight'}
                        showPagination={true}
                    />
                </div>
                <div className="row">
                    <div style={{marginTop:"20px"}} className="col-xl-6">
                        <center><h3 style={{color:"blue"}}>Relative Table</h3></center>
                        <ReactTable
                            data={relativeData}
                            columns={relativeColumn}
                            defaultPageSize={10}
                            className={'-striped -highlight'}
                            showPagination={true}
                        />
                    </div>   
                    <div style={{marginTop:"20px"}} className="col-xl-6">
                        <center><h3 style={{color:"blue"}}>Ill Person Table</h3></center>
                        <ReactTable
                            data={illData}
                            columns={illColumn}
                            defaultPageSize={10}
                            className={'-striped -highlight'}
                            showPagination={true}
                        />
                    </div>  
                </div>
                <div className="row">
                    <div style={{marginTop:"20px"}} className="col-xl-6">
                        <center><h3 style={{color:"blue"}}>Table of suspicious cases</h3></center>
                        
                        <ReactTable
                            data={susData}
                            columns={susColumn}
                            defaultPageSize={10}
                            className={'-striped -highlight'}
                            showPagination={true}
                        />
                    </div>   
                    <div style={{marginTop:"20px"}} className="col-xl-6">
                        <center><h3 style={{color:"blue"}}>Table of suspicious of third parties</h3></center>
                        
                        <ReactTable
                            data={thirdData}
                            columns={thirdColumn}
                            defaultPageSize={10}
                            className={'-striped -highlight'}
                            showPagination={true}
                        />
                    </div>  
                </div>
                <div style={{marginTop:"20px"}}>
                <center><h3 style={{color:"blue"}}>general Table</h3></center>
                    <ReactTable
                        data={generalData}
                        columns={generalColumn}
                        defaultPageSize={10}
                        className={'-striped -highlight'}
                        showPagination={true}
                    />
                </div>
              
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.auth.data,
    CSVData:state.auth.CSV,
    isLogin:state.auth.isLogin
})

export default connect(
    mapStateToProps,{}
)(Datatable)