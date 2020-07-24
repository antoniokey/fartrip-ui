import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/core/models/comment';
import { UsersService } from 'src/app/modules/user/users.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() data: Comment;

  constructor() {}

  ngOnInit(): void {}

}
