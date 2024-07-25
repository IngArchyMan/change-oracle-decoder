//Dom vars
const input_user_text_dom = document.querySelector(".input-user-text");
const btn_encripter_dom = document.querySelector("#btn-encriptar");
const btn_unencripter_dom = document.querySelector("#btn-desencriptar");
const no_text_found_container_dom = document.querySelector(".no-text-content");
const text_content_dom = document.querySelector(".encripted-text-content");
const encript_text_dom = document.querySelector(".encripted-text");
const btn_copy_text_dom = document.querySelector("#btn-copy-text");
const info_banner_dom = document.querySelector(".info-banner");
//global vars

const uppercase_regex = /[A-Z]/g;
const special_characters_regex = /[!@#$%^&*(),.?":{}|<>]/g;
const encript_key = 'nopqrstuvwxyzabcdefghijklm5678901234';
const unencript_key = 'abcdefghijklmnopqrstuvwxyz0123456789';

let copy_text_clipboard = ""

input_user_text_dom.addEventListener("input", (e) => {
  let input_text_value = e.target.value;
  let cleanner_text = [];
  const uppercase_flag = input_text_value.match(uppercase_regex) || [];
  const specialcaracter_flag =
    input_text_value.match(special_characters_regex) || [];

  if (uppercase_flag.length > 0 || specialcaracter_flag.length > 0) {
    info_banner_dom.classList.add("error-banner");
  } else {
    info_banner_dom.classList.remove("error-banner");
  }
});


btn_encripter_dom.addEventListener("click", (e) => {
  e.preventDefault();
  let input_text_lenght = input_user_text_dom.value.length;
  switchVisibilityContainers(input_text_lenght);

  encript_text_dom.innerHTML = encriptedText(input_user_text_dom.value);
})

btn_copy_text_dom.addEventListener("click", copyToClipboard);


btn_unencripter_dom.addEventListener("click", (e) => {
  e.preventDefault();
  let input_text_lenght = input_user_text_dom.value.length;
  switchVisibilityContainers(input_text_lenght);
  encript_text_dom.innerHTML = desencriptedText(input_user_text_dom.value);
})

async function copyToClipboard(){
    try {
        copy_text_clipboard = await navigator.clipboard.writeText(encript_text_dom.innerText);
      } catch (error) {
        console.log(`Ocurrió un error: ${error}`);
      }
}

function switchVisibilityContainers(text_lenght) {
  if (text_lenght > 0) {
    no_text_found_container_dom.classList.add("hidden-contanier");
    text_content_dom.classList.remove("hidden-contanier");
  } else {
    no_text_found_container_dom.classList.remove("hidden-contanier");
    text_content_dom.classList.add("hidden-contanier");
  }
}

function checkForValidText(input_text) {
  const uppercase_flag = uppercase_regex.test(input_text);
  const specialcaracter_flag = special_characters_regex.test(input_text);
  return uppercase_flag && specialcaracter_flag;
}

function encriptedText(input_text){
    let desencripted_text = '';
    for (let i = 0; i < input_text.length; i++) {
        const original_char = input_text[i];
        let  desencripted_char = original_char;
    
        const original_index = encript_key.indexOf(original_char);
        
        if (original_index !== -1) {
            desencripted_char = unencript_key[original_index];
        }
        desencripted_text += desencripted_char;
      }
    
      return desencripted_text;
}

function desencriptedText(input_text){
  let encripted_text = '';
  for (let i = 0; i < input_text.length; i++) {
      const original_char = input_text[i];
      let  encripted_char = original_char;
  
      const original_index = unencript_key.indexOf(original_char);
      
      if (original_index !== -1) {
          encripted_char = encript_key[original_index];
      }
      encripted_text += encripted_char;
    }
  
    return encripted_text;
}



navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      console.log("All permissions granted");
    }
  });