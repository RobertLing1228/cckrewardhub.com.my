import Barcode from 'react-barcode';

export default function Barcode ({ input }) {
    if (!input) {
        return null;
}
    return <Barcode value= {input} />;
};