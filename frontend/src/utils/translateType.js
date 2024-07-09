// frontend/src/utils/translateType.js
const translateType = (type) => {
    const typeMap = {
        finished_piece: 'Pièce finie',
        intermediate_piece: 'Pièce intermédiaire',
        raw_material: 'Matière première',
        purchased_piece: 'Pièce achetée'
    };

    return typeMap[type] || type;
};

export default translateType;
