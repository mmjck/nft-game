const CONTRACT_ADDRESS = "CONTRACT_ADDRESS"

const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHP.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
  };
};


export { CONTRACT_ADDRESS, transformCharacterData};