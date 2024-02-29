async function main() {
    const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame")
    const gameContract = await gameContractFactory.deploy(
        ["Rato", "Gato", "Cachorro"],
        [
            "https://i.imgur.com/kwNwWsH.jpeg",
            "https://i.imgur.com/U8ODFeB.png",
            "https://i.imgur.com/DL9HxNB.jpeg",
        ],
        [100, 200, 300],
        [100, 50, 25],
        "SERJÃO BERRANTEIRO",
        "https://i.imgur.com/qIg8vYx.png",
        10000,
        50
    )

    console.log("Contrato implantado no endereço: ", gameContract.target);
    let txn;
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();
    
    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();
    
}


main().catch((error) => {
    console.log(error);
    process.exitCode = 1
})