'use strict';

app.factory('NoteFactory', ($q, $http, FirebaseURL)=>{

  let getNotes = (tripId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}notes.json?orderBy="tripId"&equalTo="${tripId}"`)
      .success((noteData)=>{
        console.log("notes from firebase?", noteData);
        resolve(noteData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let addNote = (noteObj)=>{
    return $q((resolve, reject)=>{
      $http.post(`${FirebaseURL}notes.json`, JSON.stringify(noteObj))
      .success((noteData)=>{
        resolve(noteData);
      })
      .error((error)=>{
        reject(noteData);
      });
    });
  };

  let updateNote = (patchedText, noteId)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}notes/${noteId}.json`, JSON.stringify(patchedText))
      .success((newNote)=>{
        resolve(newNote);
      })
      .error((error)=>{
        reject(noteData);
      });
    });
  };

  return {getNotes, addNote, updateNote};
});