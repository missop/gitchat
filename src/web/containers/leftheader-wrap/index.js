import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateHomePageListAction} from '../homepagelist-wrap/action';
import {addGroupMessageAndInfoAction} from '../groupchat-wrap/action';
import LeftHeader from '@/pages/left-header'

const mapStateToProps = state => ({
    allGroupChats: state.allGroupChats,
    homePageList: state.homePageList
});

const mapDispatchToProps = dispatch => ({
    addGroupMessageAndInfo(arg = {}) {
        dispatch(addGroupMessageAndInfoAction({...arg}));
    },
    updateHomePageList(arg = {}) {
        dispatch(updateHomePageListAction({...arg}));
    }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftHeader));

