const profile = document.querySelector(".overview");
const username = "SionGH";
const repoList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToRepo = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const gitProfileInfo = async function () {
    const profileInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await profileInfo.json();
displayProfileInfo(data);
};
gitProfileInfo();

const displayProfileInfo = function(data){
    const div = document.createElement( "div");
    div.classList.add ("user-info");
    div.innerHTML =   `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> 
  `;
profile.append(div);
gitRepoInfo(username);
};
const gitRepoInfo = async function (username) {
    const getRepoInfo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await getRepoInfo.json();
    displayGetRepoInfo(repoData);
}; 
const displayGetRepoInfo = function(repos){
  filterInput.classList.remove("hide");
    for (const repo of repos) {
     const listItem = document.createElement("li");
     listItem.classList.add ("repo");
     listItem.innerHTML = `<h3> ${repo.name}</h3>`;
     repoList.append(listItem);
    }
};
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInformation(repoName);
  }
});
const getRepoInformation = async function(repoName){
  const getInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await getInfo.json();
  console.log(repoInfo);

  const fetchLanguages =  await fetch (repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
console.log(languageData);

const languages = [];
for (const language in languageData){
  languages.push(language);
}

displaySpecificRepoInfo(repoInfo, languages);
};


const displaySpecificRepoInfo = function (repoInfo, languages) {
 backToRepo.classList.remove("hide");
 repoData.innerHTML = "";
 repoData.classList.remove("hide");
 allRepos.classList.add("hide");
 const div = document.createElement("div");
 div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
  };
backToRepo.addEventListener("click", function() {
 allRepos.classList.remove ("hide");
 repoData.classList.add ("hide");
 backToRepo.classList.add("hide");
  });

filterInput.addEventListener ("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchLowerText = searchText.toLowerCase();

  for(const repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(searchLowerText)) {
      repo.classList.remove("hide");
    }  else  {
      repo.classList.add("hide");
    }
  }
});

  

