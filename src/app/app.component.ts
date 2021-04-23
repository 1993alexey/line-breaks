/* tslint:disable */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'line-breaks';
  userInput = ''
  inputLimit = 10

  textAreaChanged(e): void {
    const val = e.value;
    const lines = this.getLines(val)

    let parsedLines = []
    for (let line of lines)
      if (line.length > this.inputLimit)
        parsedLines = [...parsedLines, ...this.breakLine(line)]
      else
        parsedLines.push(line)

    this.userInput = this.stitchLines(parsedLines)
  }

  stitchLines(lines: string[]): string {
    const result = lines.reduce((acc, val) => {
      return acc += val + '\n'
    }, '')

    if (result.length >= 2)
      return result.substr(0, result.length - 1)

    return ''
  }

  getLines(text): string[] {
    return text.split('\n')
  }

  breakLine(line: string): string[] {
    if (!line)
      return []

    if (line.length <= this.inputLimit)
      return [line]

    let lineTemp = line;
    const lines = []
    while(lineTemp) {
      let subLine = lineTemp.substr(0, this.inputLimit)
      const lineEndIndex = subLine.lastIndexOf(' ')
      if (lineEndIndex !== -1)
        subLine = subLine.substr(0, lineEndIndex)

      lines.push(subLine)
      lineTemp = lineTemp.substr(subLine.length).trim()
    }

    return lines
  }
}


