import {Injectable} from "@angular/core";
import {Post} from "./post.model";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, delay, map, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {
  }

  createAndStorePost(postDataValue: Post) {
    return this.http
      .post<{ name: string}>(
        'https://ng-complete-guide-258b9-default-rtdb.europe-west1.firebasedatabase.app/testmap.json',
        postDataValue,
        {
          observe: 'response'
        }
      )
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams =searchParams.append('print', 'pretty')
    searchParams =searchParams.append('custom', 'yes')
    return this.http
      .get<{ [key: string]: Post}>('https://ng-complete-guide-258b9-default-rtdb.europe-west1.firebasedatabase.app/testmap.json',
        {
         headers: new HttpHeaders({'Custom-header': 'hello'}),
          params: searchParams
      })
      .pipe(
        delay(2500),
        map(responseData => {
          console.log('responseData', responseData)
          if (responseData === null) return [];
          const postsArray = [];
          for (const [key, value] of Object.entries(responseData)) {

            postsArray.push({...value, id:key});
          }
          return postsArray;
        }),
        catchError(errorRes => {
          console.log(errorRes)
          return throwError( errorRes)
        })
      )
  }

  deletePosts() {
    return this.http
      .delete('https://ng-complete-guide-258b9-default-rtdb.europe-west1.firebasedatabase.app/testmap.json',
        {
          observe: 'events'
        }).pipe(tap(event => {
          console.log('event', event)
          console.log('HttpEventType', HttpEventType)
          if (event.type === HttpEventType.Sent) {
            console.log('it sended')
          }
      }))
  }
}
