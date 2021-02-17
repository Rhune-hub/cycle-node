'use strict';
/**
 * Class represents Activity
 */
class Activity {
    constructor(name,dateTime,priority,note) {
        this.dateTime = dateTime;
        this.name = name;
        this.priority = priority;
        this.note = note;
    }   
    get date() {
        return this.dateTime.toLocaleDateString();
    }
    get time() {
        return this.dateTime.toLocaleTimeString();
    }
    static priorityNames = {0:'urgent',1:'high',2:'normal',3:'low'};
    getPriorityName() {
        return Activity.priorityNames[this.priority];
    }
    static fromObject(obj) {
        return new Activity(
            obj.name,
            obj.dateTime,
            obj.priority,
            obj.note
        );
    }
    static restore(key,value) {
        if (key == 'dateTime') return new Date(value);
        return value;
    }
}

/**
 * Generate basic Activities objects
 * @param {number} count - count of objects
 */
function generateActivities(count) {
    let activities = [];
    for(let i = 0; i < count; i++) {
        activities.push(new Activity('name'+i,Date.now(),Math.floor(Math.random() * 5),Date.now().toString()));
    }
    let json = JSON.stringify(activities);
    //document.write(json);
}

//Application constants
const fileDirectory = 'data/';
const commonFileName = 'igor_data';
const fileFormat = '.json';
const fileCount = 3;
const files = getFileNames(fileDirectory,commonFileName,fileFormat,fileCount);
let todos = new Array(3);
fetchFiles(files);
readyForm();

/**
 * Function load data to editor form
 */
function readyForm() {
    loadFilesToForm();
    loadPriorityToForm();
    let form = document.getElementsByClassName('editor-form')[0];
    form.addEventListener('submit',saveActivity);
    document.querySelector('input[type="submit"]').addEventListener('submit',saveActivity);
}

/**
 * Function get file names
 * @param {string} directory - files directory 
 * @param {string} fileName  - file name
 * @param {string} format - file fomat
 * @param {number} count - file count
 */
function getFileNames (directory,fileName,format,count) {
    let files = [];
    for(let i = 0; i < count; i++) {
        files.push(directory + fileName + '[' + (i+1) + ']' + format);
    }
    return files;
}
/**
 * Function load files
 * @param {string[]} files - files list
 */
function fetchFiles(files) {
    let currentIndex = 0;
    setTimeout(function next() {
        fetchFile(files[currentIndex],currentIndex+1);
        currentIndex = (currentIndex + 1) % 3;
        setTimeout(next, 1000);
    }, 1000);
}
/**
 * Function load file
 * @param {string} file - filename
 * @param {number} index - file index
 */
function fetchFile(file,index) {
    fetch(file)
      .then( res => res.text(), error => addLog(file,index,'ERROR',error.message))
      .then( json => {
            let objs = JSON.parse(json,Activity.restore);
            let activities = [];
            for (let obj of objs) {
                activities.push(Activity.fromObject(obj))
            }
            addLog(file,index,'SUCCESS');
            todos[index] = activities;
            loadToTODOList(index,activities);
   }, error => addLog(file,index,'ERROR',error.message));
}
/**
 * Function load logs to logs block
 * @param {string} file - filenmae
 * @param {number} index - file index
 * @param {string} head - result info
 * @param {string} error - error message
 */
function addLog(file,index,head,error) {
    let logs = document.querySelector('.ajaxlogs .ajax-logs-container');
    let div = document.createElement('div');
    div.classList.add('ajax-log');
    div.classList.add(head.toLowerCase());
    let result = 'Success loaded.';
    if (error) result = error;
    div.innerHTML = `${head}: Fetching file "${file}" to TODO-LIST ${index}. ${result}`;
    logs.appendChild(div);
}
/**
 * Load file to page
 * @param {number} index - number of todolist
 * @param {Activities[]} activities - list of activities 
 */
function loadToTODOList(index,activities) {
    let TODO = document.querySelector('.todolist[data-num="'+index+'"] .activities-container');
    TODO.textContent = activities.length > 0 ? '' : 'No activities.';
    
    for (let i in activities) {
        let activityBlock = createActivityBlock(index,i,activities[i]);
        TODO.appendChild(activityBlock);
    }
}
/**
 * Load active Activity to editor
 * @param {Event} e 
 */
function activityClickHandler(e) {
    let opt = e.currentTarget.id.split('-');
    let activity = todos[opt[1]][opt[2]];
    toEditor(opt[1],activity);
    
}
/**
 * Load active Activity to editor
 * @param {number} index - file index 
 * @param {Activity} activity - current activity
 */
function toEditor(index,activity) {
    document.getElementById('editor-form-file').selectedIndex = index-1;
    document.getElementById('editor-form-name').value = activity.name;
    document.getElementById('editor-form-datetime').valueAsNumber = Math.round(activity.dateTime / 60_000) * 60_000;
    document.getElementById('editor-form-note').value = activity.note;
    document.getElementById('editor-form-select').value = activity.priority + 1;
}
/**
 * Function create Activity block
 * @param {number} todoIndex - todolist index
 * @param {number} aIndex - activity index 
 * @param {Activity} activity - activity for block
 */
function createActivityBlock(todoIndex,aIndex,activity) {
    let div = document.createElement('div');
    div.classList.add('activity');
    div.id = `activity-${todoIndex}-${aIndex}`;
    let nameBlock = createNameBlock(activity.name);
    let dateTimeBlock = createDateTimeBlock(activity.dateTime);
    let noteBlock = createNoteBlock(activity.note);
    div.setAttribute('data-priority',activity.getPriorityName());
    div.appendChild(nameBlock);
    div.appendChild(dateTimeBlock);
    div.appendChild(noteBlock);
    div.addEventListener('click',activityClickHandler);
    return div;
}
/**
 * Function create block for name of Activity
 * @param {string} name - Activity name
 */
function createNameBlock(name) {
    let div = document.createElement('div');
    div.classList.add('activity-name');
    div.textContent = name;
    return div;
}
/**
 * Function create datetime block of activity
 * @param {number} datetime - datetime of Activity
 */
function createDateTimeBlock(datetime) {
    let div = document.createElement('div');
    div.classList.add('activity-datetime');
    let date = new Date(datetime).toLocaleDateString();
    let time = new Date(datetime).toLocaleTimeString();
    div.textContent = 'Date: ' + date + ', Time: ' + time;
    return div;
}
/**
 * Function create note block of activity
 * @param {string} note - note of activity
 */
function createNoteBlock(note) {
    let div = document.createElement('div');
    div.classList.add('activity-note');
    div.textContent = note;
    return div;
}
/**
 * Function load priorities types to form
 */
function loadPriorityToForm() {
    let select = document.getElementById('editor-form-select');
    let i = 1;
    for(let p in Activity.priorityNames) {
        let option = document.createElement('option');
        option.value = i;
        option.text = Activity.priorityNames[p];
        i++;
        select.appendChild(option);
    }
}
/**
 * Function load files list to fro mselector
 */
function loadFilesToForm() {
    let select = document.getElementById('editor-form-file');
    let i = 1;
    for ( let file of files) {
        let option = document.createElement('option');
        option.value = file;
        option.text = i;
        select.appendChild(option);
        i++;
    }
}
/**
 * Save Activity to file
 * @param {Event} e 
 */
function saveActivity(e) {
    e.preventDefault();
    let els = e.currentTarget.elements;
    const prev = 'new-activity-';
    let fileName = els[prev+'file'].value;
    let newActivity = new Activity( 
        els[prev+'name'].value,
        els[prev+'datetime'].value,
        els[prev+'priority'].value,
        els[prev+'note'].value
    );
    let fileNum = els[prev+'file'].selectedIndex+1;
    let ind = todos[fileNum]
        .findIndex(item => item.name = newActivity.name);
    
        if(ind >= 0)
        todos[fileNum][ind] = newActivity;
    else 
        todos[fileNum].push(newActivity);
    loadToTODOList(fileNum,todos[fileNum]);

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/server', true);
        xhr.setRequestHeader("Content-Type","multipart/form-data");
    var formData = new FormData();
    formData.append(fileName, todos);
    xhr.send(formData);

}
