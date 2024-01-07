const Resume = () => {
    const pdfPath = "Resume-Nethma-Kalpani.pdf";

    return (
        <>
            <embed
                src={pdfPath}
                type="application/pdf"
                width="100%"
                className="h-screen"
            />
        </>
    );
};

export default Resume;
