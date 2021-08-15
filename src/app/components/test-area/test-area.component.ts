import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/interfaces/test';
import { TestService } from './../../services/test.service';

@Component({
  selector: 'app-test-area',
  templateUrl: './test-area.component.html',
  styleUrls: ['./test-area.component.css']
})
export class TestAreaComponent implements OnInit {

  testsList: Question[] = [];

  //question: Question | any;
  currentQ: Question | any;
  qCounter: number = 0;
  answers: String[] = [];
  score: number = 0;
  selectedAnswer: String = "";
  finalQ: boolean = false;
  showResults: boolean = false;
  testEnd: boolean = true;

  constructor(private activatedRout: ActivatedRoute, private testService: TestService) { }

  ngOnInit(): void {

    this.activatedRout.params.subscribe(
      (params) => {

        this.testService.getTestViaREST(params.categoryName).
          subscribe(

            data => {
              this.testsList = data.results;
              this.currentQ = data.results[0];
              this.answers = this.getAllAnswers();
              this.answers.push(this.testsList[this.qCounter].correct_answer);
              this.answers = this.shuffleArray(this.answers);
              console.log("fetch data called");


            }
          )
      }

    )

  }


  nextQestion(): void {

    if(this.qCounter==0){
      if (this.selectedAnswer === this.testsList[this.qCounter].correct_answer) this.score++;
    }

    if (this.qCounter < 9) {
      this.qCounter++;
      this.currentQ = this.testsList[this.qCounter].question;
      this.answers = [];
      let questionPrompt = document.getElementById("question-promt")!;
      let htmlContent = "" + this.currentQ.replace("&quot;", "\"");
      htmlContent.replace("&#039;", "\'");
      questionPrompt.innerHTML = htmlContent;
      this.answers = this.testsList[this.qCounter].incorrect_answers;
      if (this.answers.length < 4) this.answers.push(this.testsList[this.qCounter].correct_answer);
      this.answers = this.shuffleArray(this.answers);

      if (this.selectedAnswer === this.testsList[this.qCounter-1].correct_answer) this.score++;
     
      if (this.qCounter == 9) {
        document.getElementById("nextBtn")!.innerHTML = "Submit";
        this.finalQ = true;
      }
    } else if (this.finalQ) {

      this.getTestResult();
    }

    // console.log("array of answers", this.answers);
  }

  answerSelected(event: any) {


    // let correctAnswer = this.testsList[this.qCounter].correct_answer;
    this.selectedAnswer = event.target.value;

    console.log("selected answer = >", event.target.value);
    console.log("right answer => ", this.testsList[this.qCounter].correct_answer);




  }

  getTestResult() {

    console.log("the score is ", this.score);

    this.score*= 10;

    this.testEnd = false;
    this.showResults = true;


  }

  previousQuestion(): void {

    if( document.getElementById("nextBtn")!.innerHTML == "Submit"){
      document.getElementById("nextBtn")!.innerHTML = "next"
    }

    if (this.qCounter > 0) {
      this.qCounter--;
      this.currentQ = this.testsList[this.qCounter].question;
      this.answers = [];
      let questionPrompt = document.getElementById("question-promt")!;
      let htmlContent = "" + this.currentQ.replace("&quot;", "\"");
      htmlContent.replace("&#039;", "\'");
      questionPrompt.innerHTML = htmlContent;
      this.answers = this.testsList[this.qCounter].incorrect_answers;
      this.answers = this.shuffleArray(this.answers);
      this.score--;
    } else {
      console.log("limit reached =>", this.qCounter);

    }

  }


  getAllAnswers(): String[] {

    let allAnwers: String[] = this.currentQ.incorrect_answers;
    //allAnwers.push(this.currentQ.correct_answer);

    return allAnwers;

  }

  shuffleArray(array: String[]): String[] {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}
