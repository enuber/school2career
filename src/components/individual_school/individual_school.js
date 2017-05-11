import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchOneSchool } from '../../actions/actions_index';
import Map from './places_image';
import Paper from 'material-ui/Paper';

import MajorsChart from './majors_percent';
import MfChart from './male_female_chart';
import ReturnToListbtn from './btn_return_list';
import DegreeList from './degrees';

class School extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    handleClick() {
        this.context.router.push('/school_search');
    };
    componentDidMount() {
        let pathArray = window.location.pathname.split( '/' );
        this.props.searchOneSchool(pathArray[pathArray.length -1]);
    };

    render() {
        let data = this.props.school.single;
        if(!data ){
            return <p>Loading...</p>
        }
        data = data.school;
        //Admissions Rate Math
        let admissionRate = parseFloat(data.adm_rate);
        if (parseFloat(admissionRate) > 0) {
            admissionRate = (admissionRate * 100).toFixed(2);
            admissionRate += '%';
        } else {
            admissionRate = 'Not Provided';
        }
        //SAT SCORE
        let satAvg = parseInt(data.sat_avg);
        if (satAvg===0) {
            satAvg = "Not Provided";
        }
        //School Type
        let instType = data.ownership;
        instType = parseInt(instType);
        switch (instType) {
            case 1:
                instType = "Public";
                break;
            case 2:
                instType = "Private (nonprofit)";
                break;
            case 3:
                instType = "Private (for-profit)";
                break;
        }
        let tuitionIn = '$' + (parseFloat(data.tuition_in)).toLocaleString();
        let tuitionOut = '$' + (parseFloat(data.tuition_out)).toLocaleString();
        if(tuitionIn === '$0'){
            tuitionIn = 'Not Provided';
        }
        if(tuitionOut === '$0'){
            tuitionOut = 'Not Provided';
        }
        let www = data.url.indexOf('www.')
        let url = null;
        if (www < 0){
            url = data.url;
            return;
        } else {
            url = data.url.slice(www + 4);
        }
        const findForwardSlash = url.lastIndexOf('/');
        if(findForwardSlash === url.length -1){
            url = url.substring(0, url.length - 1)
        }
        return (
            <div>
                <div className='imageDiv'>
                    <div className="schoolImgHolder">
                        <img className="schoolImg col-sm-12 " src={this.props.schoolImgURL} />
                        <div className="schoolName">
                            <h2 className='universityText'>{data.name} </h2>
                            <h4 className='universityText'>{data.city}, {data.state}</h4>
                            <h5 className="webAddress universityText col-md-5"><a target="_blank" href={'http://' + data.url}>{url}</a></h5>
                        </div>
                    </div>
                </div>
                <ReturnToListbtn onClick={() => this.handleClick()}/>
                <div className="container">
                    <Paper className="statsWrapper">
                        <div className="row">
                            <h4 className="col-md-4 singleStats">Admissions Rate: {admissionRate}</h4>
                            <h4 className="col-md-4 singleStats">SAT Avg: {satAvg}</h4>
                            <h4 className="col-md-4 singleStats">Undergrad Size: {data.size} students</h4>
                        </div>
                        <br/>
                        <div className="row">
                            <h4 className="col-md-4 singleStats">{instType} School</h4>
                            <h4 className="col-md-4 singleStats">Tuition (in state): {tuitionIn}</h4>
                            <h4 className="col-md-4 singleStats">Tuition (out of state): {tuitionOut}</h4>
                        </div>
                    </Paper>
                    <Paper className="mapPaper">
                        <Map id="mapShowing"/>
                    </Paper>
                    <Paper className="statsWrapper">
                        <MfChart />
                    </Paper>
                    <Paper >
                        <MajorsChart className="majorsChart" />
                    </Paper>
                    <Paper className="statsWrapper">
                        <DegreeList/>
                    </Paper>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log(state.schoolImgURL)
    return {
        school: state.schools,
        schoolImgURL: state.schoolImgURL.image
    };
}

export default connect(mapStateToProps, { searchOneSchool })(School);
