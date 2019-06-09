import {
  Http,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestMethod
} from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { IUserAccount } from "../interfaces/IUserAccount";

import { ISignupUser } from "./../../models/user";

let userTableStorageLocal: IUserAccount[] = [];

let songCollection: { username: string; songs: number[] }[] = [];

function b64EncodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    })
  );
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

export let fakeBackendProvider = {
  provide: Http,
  useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let isUsernameUnique = (user: IUserAccount) => {
        return (
          userTableStorageLocal.findIndex(
            (currentUser: IUserAccount) =>
              currentUser.username === user.username
          ) === -1
        );
      };

      let getSongCollectionByUser = (username: string): number[] => {
        let collection = songCollection.filter(
          song => song.username === username
        )[0];
        if (collection) {
          return collection.songs;
        } else return [];
      };

      let removeSong = (username: string, trackId: number) => {
        return songCollection.reduce(function(prev, cur) {
          if (cur["username"] === username) {
            cur["songs"] = cur["songs"].filter(song => song !== trackId);
            prev.push(cur);
          }
          return prev;
        }, []);
      };

      let isSongAllreadyAdded = (user: string, trackId: number) => {
        return (
          songCollection.reduce((songs, cur) => {
            if (cur && cur.username === user) {
              if (cur.songs.indexOf(trackId) !== -1) {
                songs.push(cur);
              }
            }
            return songs;
          }, []).length > 0
        );
      };
      let isAuthValid = (user: IUserAccount) => {
        return (
          userTableStorageLocal.findIndex(
            (currentUser: IUserAccount) =>
              currentUser.username === user.username &&
              currentUser.password === user.password
          ) !== -1
        );
      };

      setTimeout(() => {
        if (
          connection.request.url.endsWith("/api/authenticate/signup") &&
          connection.request.method === RequestMethod.Post
        ) {
          let params = JSON.parse(connection.request.getBody());
          let tokenValid24hours = new Date();
          tokenValid24hours.setDate(tokenValid24hours.getDate() + 1);
          if (
            params.username !== "" &&
            params.password !== "" &&
            isUsernameUnique(params)
          ) {
            let resBody = {
              username: params.username,
              token: tokenValid24hours
            };

            console.debug(
              "=== [fake-backend] reponse 200::POST:/api/authenticate/signup, resBody : ",
              JSON.stringify(resBody)
            );
            userTableStorageLocal.push({
              id: tokenValid24hours.getMilliseconds(),
              username: params.username,
              password: b64EncodeUnicode(params.password),
              token: tokenValid24hours.getUTCMilliseconds().toPrecision()
            });
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  status: 200,
                  body: resBody
                })
              )
            );
          } else {
            let resBody = { error: true, errorMessages: "Signup failed" };
            console.debug(
              "=== [fake-backend] reponse 500::POST:/api/authenticate/signup, resBody : ",
              JSON.stringify(resBody)
            );
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  status: 500,
                  body: resBody
                })
              )
            );
          }
        }

        if (
          connection.request.url.endsWith("/api/authenticate/signup/user") &&
          connection.request.method === RequestMethod.Post
        ) {
          let params = JSON.parse(connection.request.getBody());
          if (isUsernameUnique(params)) {
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  status: 200,
                  body: { username: params.username }
                })
              )
            );
          } else {
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  status: 200,
                  body: { error: true, errorMessages: "User not available" }
                })
              )
            );
          }
        }

        if (
          connection.request.url.endsWith("/api/music/song") &&
          connection.request.method === RequestMethod.Post
        ) {
          let params = JSON.parse(connection.request.getBody());
          if (!isSongAllreadyAdded(params.username, params.trackId)) {
            if (getSongCollectionByUser(params.username).length)
              getSongCollectionByUser(params.username).push(params.trackId);
            else
              songCollection.push({
                username: params.username,
                songs: [
                  ...getSongCollectionByUser(params.username),
                  params.trackId
                ]
              });
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  status: 200,
                  body: {
                    trackId: params.trackId,
                    songCollection: getSongCollectionByUser(params.username)
                  }
                })
              )
            );
          } else {
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  status: 200,
                  body: { error: true, errorMessages: "Song allready added" }
                })
              )
            );
          }
        }
        console.log("HERERERE ", connection.request);
        if (
          connection.request.url.includes("/api/music/song") &&
          connection.request.method === RequestMethod.Delete
        ) {
          const paramsRe = connection.request.url.match(
            /trackId=(.*)&username=(.*)/
          );
          const params = {
            trackId: Number.parseInt(paramsRe[1]),
            username: paramsRe[2]
          };

          if (isSongAllreadyAdded(params.username, params.trackId)) {
            songCollection = removeSong(params.username, params.trackId);

            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  status: 200,
                  body: {
                    trackId: params.trackId,
                    songCollection: getSongCollectionByUser(params.username)
                  }
                })
              )
            );
          } else {
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  status: 200,
                  body: { error: true, errorMessages: "Song remove failed" }
                })
              )
            );
          }
        }

        if (
          connection.request.url.endsWith("/api/authenticate/login") &&
          connection.request.method === RequestMethod.Post
        ) {
          let params = JSON.parse(connection.request.getBody());
          let tokenValid24hours = new Date();
          tokenValid24hours.setDate(tokenValid24hours.getDate() + 1);
          if (
            params.username !== "" &&
            params.password !== "" &&
            isAuthValid({
              ...params,
              password: b64EncodeUnicode(params.password)
            })
          ) {
            let resBody = {
              username: params.username,
              token: tokenValid24hours
            };
            console.debug(
              "=== [fake-backend] reponse 200::POST:/api/authenticate/login, resBody : ",
              JSON.stringify(resBody)
            );
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  status: 200,
                  body: resBody
                })
              )
            );
          } else {
            let resBody = {
              error: true,
              errorMessages: "User not found or invalid credentials"
            };
            console.debug(
              "=== [fake-backend] reponse 503::POST:/api/authenticate/login, resBody : ",
              JSON.stringify(resBody)
            );
            connection.mockRespond(
              new Response(
                new ResponseOptions({
                  status: 503,
                  body: resBody
                })
              )
            );
          }
        }
      }, 5000);
    });

    return new Http(backend, options);
  },
  deps: [MockBackend, BaseRequestOptions]
};
