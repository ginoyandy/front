/*
const handleDateChange: ((date: Date) => any) &
    ((
        date: Date | null,
        event: SyntheticEvent<any, Event> | undefined
    ) => void) &
    FormEventHandler<HTMLElement> = (eventDate) => {
    setInput((prevValue) => ({
        ...prevValue,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        date: new Date(eventDate),
        title: titleGenerator(eventDate as Date),
    }));
    console.log(input);
};

FormControl>
                <FormLabel htmlFor="published-date">Date</FormLabel>
                <DatePicker
                    id="date"
                    selectedDate={input.date}
                    onChange={handleDateChange}
                    showPopperArrow={true}
                />
            </FormControl>

*/

export {};
