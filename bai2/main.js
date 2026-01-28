
// Load danh sách Post (kể cả post xóa mềm)
async function LoadData() {
    let res = await fetch("http://localhost:3000/posts");
    let posts = await res.json();

    let body = document.getElementById("body_table");
    body.innerHTML = "";

    for (const post of posts) {
        body.innerHTML += `
        <tr style="${post.isDeleted ? 'text-decoration: line-through; color: gray;' : ''}">
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.views}</td>
            <td>
                ${!post.isDeleted 
                    ? `<input type="button" value="Delete" onclick="DeletePost('${post.id}')"/>`
                    : ''}
            </td>
        </tr>`;
    }
}

// Lấy ID tiếp theo (maxId + 1) – ID là chuỗi
function getNextPostId(posts) {
    if (posts.length === 0) return "1";
    let maxId = Math.max(...posts.map(p => Number(p.id)));
    return String(maxId + 1);
}

// Thêm mới / Cập nhật Post
async function Save() {
    let id = document.getElementById("id_txt").value.trim();
    let title = document.getElementById("title_txt").value;
    let views = document.getElementById("view_txt").value;

    // UPDATE
    if (id !== "") {
        let res = await fetch("http://localhost:3000/posts/" + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                views: views
            })
        });
        if (res.ok) console.log("Cập nhật thành công");
    }
    // CREATE
    else {
        let resAll = await fetch("http://localhost:3000/posts");
        let posts = await resAll.json();

        let newPost = {
            id: getNextPostId(posts),
            title: title,
            views: views,
            isDeleted: false
        };

        let res = await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        });
        if (res.ok) console.log("Thêm mới thành công");
    }

    LoadData();
    return false;
}

// Xóa mềm Post
async function DeletePost(id) {
    let res = await fetch("http://localhost:3000/posts/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            isDeleted: true
        })
    });
    if (res.ok) console.log("Xóa mềm thành công");
    LoadData();
}



// ================= COMMENTS =================

// Load comment theo post
async function LoadComments(postId) {
    let res = await fetch(`http://localhost:3000/comments?postId=${postId}`);
    let comments = await res.json();
    console.log(comments);
}

// Lấy ID comment tự tăng
function getNextCommentId(comments) {
    if (comments.length === 0) return "1";
    let maxId = Math.max(...comments.map(c => Number(c.id)));
    return String(maxId + 1);
}

// Thêm comment
async function AddComment(postId, content) {
    let resAll = await fetch("http://localhost:3000/comments");
    let comments = await resAll.json();

    let newComment = {
        id: getNextCommentId(comments),
        postId: postId,
        content: content,
        isDeleted: false
    };

    await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment)
    });
}

// Cập nhật comment
async function UpdateComment(id, content) {
    await fetch("http://localhost:3000/comments/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: content
        })
    });
}

// Xóa mềm comment
async function DeleteComment(id) {
    await fetch("http://localhost:3000/comments/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            isDeleted: true
            
        })
    });
}


// Load ban đầu
LoadData();
