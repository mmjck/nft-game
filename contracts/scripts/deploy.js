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
    // https://testnet.rarible.com/token/0x3c0b8710EE768e4b0f709ff52d4179B7E50bA794:2
    // await gameContract.waitForDeployment();
    console.log("Contrato implantado no endereço: ", gameContract.target);
}


const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();