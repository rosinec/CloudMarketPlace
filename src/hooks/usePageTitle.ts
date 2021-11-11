import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Cloud Marketplace`;
	}, [title]);
};

export default usePageTitle;
