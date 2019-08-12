import React, {Component} from 'react';
import Axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangeFilePath = this.onChangeFilePath.bind(this);

        this.state = {
            fileName: 'Choose File',
            file: null
        }

    }

    componentDidMount() {
        document.title = "ABC Home";

    }


    submit() {
        if (this.state.file == null) {
            return (
                <input type="submit" className='btn btn-success uploadButton' value="Upload" disabled/>
            )
        } else {
            return (
                <input type="submit" className='btn btn-success uploadButton' value="Upload"/>
            )
        }
    }


    onSubmit(e) {
        e.preventDefault();

        const fd = new FormData();
        fd.append("file", this.state.file, this.state.file.name);


        console.log(this.state.file);
        console.log(this.state.file.name);

        Axios.post('http://localhost:8080/assignment/upload', fd).then(resolve => {

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            if (this.state.submissionFile != null) {
                const obj = {
                    file: resolve.data,
                    date: today
                }
                Axios.put('http://localhost:4000/node/submission/' + this.state.subId, obj).then(resolve => {
                    console.log(resolve);
                    this.props.history.push('/');
                }).catch(err => {
                    console.log(err);
                });
            } else {
                console.log(resolve)

                console.log(today);
                const obj = {
                    assId: this.state.assignmentID,
                    stdId: sessionStorage.getItem('UserID'),
                    file: resolve.data,
                    date: today
                }
                Axios.post('http://localhost:4000/node/submission', obj).then(resolve => {
                    console.log(resolve);
                    this.props.history.push('/');
                }).catch(err => {
                    console.log(err);
                });
            }


        }).catch(err => {
            console.log(err)
        });
    }


    onChangeFilePath(e) {


        if (e.target.files[0] == null) {
            this.setState({
                fileName: 'Choose File'
            });
        } else {
            const fileX = e.target.files[0];
            console.log(fileX);
            this.setState({
                file: e.target.files[0],
                fileName: e.target.files[0].name
            });
        }

    }


    onChangeFile(e) {


        if (e.target.files[0] == null) {
            this.setState({
                fileName: 'Choose File'
            });
        } else {
            const fileX = e.target.files[0];
            console.log(fileX);
            this.setState({
                file: e.target.files[0],
                fileName: e.target.files[0].name
            });
        }

    }

    render() {
        return (
            <div className='cardView'>
                <div className='card'>

                    <div className='card-header'>
                        <div className='card-title'>
                            <h2>Code Complexity Measuring Tool</h2>
                        </div>
                    </div>


                    <form className="file" onSubmit={this.onSubmit}>

                        <div className='card-body'>


                            <div className="form-group">
                                <h3>Select Language : </h3>
                                <div className="input-group  mb-3  col-md-5">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                               type="radio"
                                               name="languages"
                                               id="java"
                                               value="java"
                                            // checked={this.state.todo_priority === 'Low'}
                                            // onChange={this.onChangeTodoPriority}
                                        />
                                        <label className="form-check-label">Java</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                               type="radio"
                                               name="languages"
                                               id="c"
                                               value="c"
                                            // checked={this.state.todo_priority === 'Medium'}
                                            // onChange={this.onChangeTodoPriority}
                                        />
                                        <label className="form-check-label">C++</label>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group">
                                <h3>Upload Code : </h3>
                                <div className="input-group  mb-3  col-md-5">
                                    <div className="custom-file">
                                        <input type="file" required className="custom-file-input" id="inputGroupFile01"
                                               onChange={this.onChangeFile}/>
                                        <label className="custom-file-label"
                                               htmlFor="inputGroupFile01">{this.state.fileName}</label>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group  mb-3  col-md-5">
                                    <input type="text" className="form-control" id="inputGroupFilePath"
                                           placeholder="File Path"/>
                                </div>
                            </div>


                        </div>


                        <div className="card-footer">
                            {this.submit()}

                        </div>


                    </form>
                </div>
            </div>


        )
    }
}