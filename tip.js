const web3 = new Web3(Web3.givenProvider);

const form = document.querySelector("form");

const send = async function (amount) {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const wei = web3.utils.toWei(amount, "ether");

  if (accounts.length > 0) {
    window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          to: "0xa2CA90765cc887FB290fcF29257a4Be3794e1222",
          value: web3.utils.toHex(wei),
        },
      ],
    });
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (window.ethereum) {
    const input = form.querySelector("input");
    send(input.value);
  } else {
    form.textContent = "Please install a metamask wallet";
  }
});
