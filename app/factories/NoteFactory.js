'use strict';

app.factory('NoteFactory', ($q, $http, FirebaseURL)=>{

  let getNotes = (tripId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}notes.json?orderBy="tripId"&equalTo="${tripId}"`)
      .success((noteData)=>{
        resolve(noteData);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let getCurrentNote = (noteId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${FirebaseURL}notes/${noteId}`)
      .success((note)=>{
        console.log("note from firebase?", note);
        resolve(note);
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
        reject(error);
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
        reject(error);
      });
    });
  };

  let deleteNoteFromTrip = (noteId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${FirebaseURL}notes/${noteId}.json`)
      .success((deleted)=>{
        resolve(deleted);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  return {getNotes, addNote, updateNote, deleteNoteFromTrip, getCurrentNote};
});