import React from 'react';
import { Redirect, withRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { routes } from '@/router/mainRouter';
import { connect } from 'react-redux';
import { Layout } from 'antd';
const { Content } = Layout;

const MainContent = ({ location }) => {
	const roleType = sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo')).role.type;
	const handleFilter = permission => {
		// 过滤没有权限的页面
		if (!permission || permission === roleType) return true;
		return false;
	};

	return (
		<TransitionGroup>
			<CSSTransition classNames="fade" key={location.pathname} timeout={500}>
				<Content style={{ padding: '20px'}}>
					<Switch>
						{routes.map(ele => {
							return handleFilter(ele.permission) && <Route component={ele.component} key={ele.path} path={ele.path} />;
						})}
						<Redirect from='/' to="/error/404" />
					</Switch>
				</Content>
			</CSSTransition>
		</TransitionGroup>
	);
};

const mapStateToProps = state => ({ userInfo: state.userInfo });
export default withRouter(connect(mapStateToProps)(MainContent));