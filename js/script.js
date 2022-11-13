const profile = document.querySelector(".overview");
const username = "SionGH";
const repoList = document.querySelector(".repo-list");

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
gitRepoInfo();
};
const gitRepoInfo = async function () {
    const getRepoInfo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await getRepoInfo.json();
    displayGetRepoInfo(repoData);
}; 
const displayGetRepoInfo = function(repos){
    for (const repo of repos) {
     const listItem = document.createElement("li");
     listItem.classList.add ("repo");
     listItem.innerHTML = `<h3> ${repo.name}</h3>`;
     repoList.append(listItem);
    }
};