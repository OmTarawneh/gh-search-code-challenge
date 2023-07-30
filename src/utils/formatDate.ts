export const formatDate = (dateString: string): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		timeZone: "UTC",
		timeZoneName: "short",
	};

	const date = new Date(dateString);

	return date.toLocaleString("en-US", options);
};
