import React, {useEffect} from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import {useTheme, Theme} from '@material-ui/core/styles';
import 'nprogress/nprogress.css';

const NextNProgress: React.FC = () => {
	let timer = 0;
	const height = 4;
	const startPosition = 0.3;
	const stopDelayMs = 200;

	const theme: Theme = useTheme();
	const color = theme.palette.secondary.main;

	const routeChangeStart = (): void => {
		NProgress.set(startPosition);
		NProgress.start();
	};

	const routeChangeEnd = (): void => {
		window.clearTimeout(timer);
		timer = window.setTimeout(() => {
			NProgress.done(true);
		}, stopDelayMs);
	};

	useEffect(() => {
		Router.events.on('routeChangeStart', routeChangeStart);
		Router.events.on('routeChangeComplete', routeChangeEnd);
		Router.events.on('routeChangeError', routeChangeEnd);

		return () => {
			Router.events.off('routeChangeStart', routeChangeStart);
			Router.events.off('routeChangeComplete', routeChangeEnd);
			Router.events.off('routeChangeError', routeChangeEnd);
		};
	}, []);

	return (
		<style jsx global>{`
			#nprogress {
				pointer-events: none;
			}
			#nprogress .bar {
				background: ${color};
				position: fixed;
				z-index: 99999;
				top: 0;
				left: 0;
				width: 100%;
				height: ${height}px;
			}
			#nprogress .peg {
				display: block;
				position: absolute;
				right: 0px;
				width: 100px;
				height: 100%;
				box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
				opacity: 1;
				-webkit-transform: rotate(3deg) translate(0px, -4px);
				-ms-transform: rotate(3deg) translate(0px, -4px);
				transform: rotate(3deg) translate(0px, -4px);
			}
			#nprogress .spinner {
				display: 'block';
				position: fixed;
				z-index: 1031;
				top: 15px;
				right: 15px;
				z-index: 99999;
			}
			#nprogress .spinner-icon {
				width: 18px;
				height: 18px;
				box-sizing: border-box;
				border: solid 2px transparent;
				border-top-color: ${color};
				border-left-color: ${color};
				border-radius: 50%;
				-webkit-animation: nprogresss-spinner 400ms linear infinite;
				animation: nprogress-spinner 400ms linear infinite;
			}
			.nprogress-custom-parent {
				overflow: hidden;
				position: relative;
			}
			.nprogress-custom-parent #nprogress .spinner,
			.nprogress-custom-parent #nprogress .bar {
				position: absolute;
			}
			@-webkit-keyframes nprogress-spinner {
				0% {
					-webkit-transform: rotate(0deg);
				}
				100% {
					-webkit-transform: rotate(360deg);
				}
			}
			@keyframes nprogress-spinner {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		`}</style>
	);
};

export default NextNProgress;
