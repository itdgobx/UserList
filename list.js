function clearList(){
    const userList = document.getElementById('user_list');
    while(userList.firstChild){
        userList.removeChild(userList.firstChild);
    }
}


function appendUsers(users) {
    users.forEach(function (user) {
        // Create list item (li) element
        const li = document.createElement('li');

        // Set the content of the list item
        li.innerHTML = `${user.name} ${user.age}`;

        // Set a data-id attribute with the user's id
        li.setAttribute('data-id', user.id);

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        //delete 单独的user
        deleteButton.addEventListener('click', function () {
            deleteUsersById(user.id);
        });

        // Append the delete button to the list item
        li.appendChild(deleteButton);

        // Append the list item to the user list element in the DOM
        document.getElementById('user_list').appendChild(li);
    });
}

function getList() {
    console.log('getList is fired');
    const url = 'http://localhost:8000/api/users';

    axios.get(url)
        .then(function (res) {
            console.log('res', res);
            const users = res.data.data;
            clearList();
            //在每次提取内容之前先把之前的内容删掉,在console.log 可以看到数据被提取的过程
            appendUsers(users);
        })
        .catch(function (err) {
            console.error('Error fetching user list:', err);
        });
}
 
function postUser(){
    console.log('postUser is fired');
    //只要这里连上,在页面上按add user 就会触发console.log
    const url = 'http://localhost:8000/api/users';
    //用javascript 语法拿到html 上的username 和 age 以及它们的输入框值
    const nameInput = document.getElementById('username');
    const nameValue = nameInput.value;
    const ageInput = document.getElementById('age');
    const ageValue = ageInput.value;
    //在console.log 里打印确认, nameValue 和 ageValue 都是通过nameInput 和 ageInput 的方法获得的
    console.log(nameValue,ageValue);
    if(!nameValue || !ageValue) return;
    const body = {
        name: nameValue,
        age: ageValue,
    };
    axios.post(url,body)
    .then(function(res){
        const updatedUsers = res.data.data;
        clearList();
        appendUsers(updatedUsers);
    })
    .catch(function(err){
        console.log('Error adding user:',err);
    });
}

function deleteList(){
    console.log('deleteList is fire');
    //点击前端的clear list button 会返回'deleteList is fire' 代表前后相连
    const url = 'http://localhost:8000/api/users';
    axios.delete(url)
    .then(function(){
            console.log('user list cleared in backend');
            getList();
        })
    .catch(function(err){
        console.error('Error clearing user list:', err)
    })
    }

function deleteUsersById(userId){
    console.log('delete user is fired');
    const url = `http://localhost:8000/api/users/${userId}`;
    axios.delete(url)
    .then(function(res){
        console.log(userId + ' deleted');
        getList();
    })
    .catch(function(err){
        console.error(`Error deleting user with Id ${userId}`, err);
    });


}