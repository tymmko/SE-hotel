declare module '*.m.less';

declare module '*.svg' {
	const fileUrl: string;
	export = fileUrl;
}