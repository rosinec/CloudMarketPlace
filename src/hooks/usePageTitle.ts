import { useEffect } from 'react';

import { useTranslation } from '../hooks/useTranslation';

const usePageTitle = (title: string) => {
	const t = useTranslation();

	useEffect(() => {
		document.title = `${title} | ${t('app.title')}`;
	}, [title]);
};

export default usePageTitle;
