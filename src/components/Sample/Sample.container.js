import Sample from 'components/Sample/Sample';

// redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {sample} from 'Redux/actions/index';

const mapStateToProps = (state, ownProps) => ({
  increment: state.sample.increment,
});

const mapDispatchToProps = dispatch => bindActionCreators({sample}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sample);
