import React, { Component, PropTypes } from 'react';
import { AppBar, Tabs, Tab, Value } from 'material-ui';
import { Link } from 'react-router';


const styles = {
    stylesTab: {
        marginRight: '25px',
        color: 'white'
    },
    title: {
        cursor: 'pointer',
    }
};


class NavBar extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    handleTouchTap() {
        this.context.router.push('/');
    }

    render() {
        return(
            <AppBar
                title={<span onClick={() => this.handleTouchTap()} style={styles.title}>School2Career</span>}
                showMenuIconButton={false}>
                <Tabs>
                    <Tab style={styles.stylesTab} className="navBarLink" label="&nbsp;Home&nbsp;" containerElement={<Link to="/school_search"/>}/>
                    <Tab style={styles.stylesTab} className="navBarLink" label="&nbsp;About&nbsp;" containerElement={<Link to="/about"/>}/>
                </Tabs>
            </AppBar>
        );
    }
}

export default NavBar;
