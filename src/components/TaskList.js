import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux'
import * as actions from '../actions/index'

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1,
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        // this.props.onFilter(name === 'filterName' ? value : this.state.filterName, name === 'filterStatus' ? value : this.state.filterStatus);
        let filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status:  name === 'filterStatus' ? value : this.state.filterStatus
        }
        this.props.onFilterTable(filter)
        this.setState({
            [name] : value
        });
    }
    onReset = () => {
        this.setState({
            filterName : '',
            filterStatus : -1
        });
        this.props.onFilterTable({
            name: '',
            status: -1
        })
        this.props.onSearch('')
    }

    render() {
        
        var { tasks,filterTable,sort } = this.props;

        if(sort.by === 'name'){
        tasks.sort((a, b) => {
            if(a.name > b.name) return sort.value;
            else if(a.name < b.name) return -sort.value;
            else return 0;
        });
        }else{
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sort.value;
                else if(a.status < b.status) return sort.value;
                else return 0;
            });
        }



        if(this.props.keyword){
            tasks = tasks.filter( x => x.name.toLowerCase().indexOf(this.props.keyword.toLowerCase()) !== -1)
        }

        if(filterTable.name){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
            });
        }

        if( parseInt(filterTable.status,10) === 1 ){
            tasks = tasks.filter( x=> x.status === true )
        }
        if( parseInt(filterTable.status,10) === 0){
            tasks = tasks.filter( x=> x.status === false )
        }
        
        var elmTasks = tasks.map((task, index) => {
            return (
                <TaskItem
                    key={task.id}
                    task={task}
                    index={index + 1}
                    
                    onDeleteTask={ this.props.onDeleteTask }
                />
            )
        });
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        onChange={ this.onChange }
                                        value={ this.state.filerName }
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        onChange={ this.onChange }
                                        value={ this.state.filterStatus }
                                    >
                                        <option value={-1}>Tất Cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td> <button onClick={this.onReset} className="btn btn-block btn-primary ">Reset</button>   </td>
                            </tr>
                            { elmTasks }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter))
        },
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (TaskList);
