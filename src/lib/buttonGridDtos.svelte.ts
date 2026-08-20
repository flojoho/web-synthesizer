
export class NoteButtonDto {
  public x: number;
  public y: number;
  public noteNumber: number;
  public highlighted = $state(false);
  
  constructor(noteNumber: number, x: number, y: number) {
    this.noteNumber = noteNumber;
    this.x = x;
    this.y = y;
  }
}

const highlightGroups: (NoteButtonDto[])[] = [];

export const addToHighlightGroup = (noteButtonDto: NoteButtonDto) => {
  const { noteNumber } = noteButtonDto;

  if(typeof highlightGroups[noteNumber] === 'undefined') {
    highlightGroups[noteNumber] = []
  }

  highlightGroups[noteNumber].push(noteButtonDto);
}

let noteButtonDtos = $state<NoteButtonDto[]>([]);

export const set = (newValue: NoteButtonDto[]) => {
  noteButtonDtos = newValue;
}

export const get = () => {
  return noteButtonDtos;
}

export const enableHighlight = (noteNumber: number) => {
  highlightGroups[noteNumber]?.forEach(noteButtonDto => noteButtonDto.highlighted = true);
}

export const disableHighlight = (noteNumber: number) => {
  highlightGroups[noteNumber]?.forEach(noteButtonDto => noteButtonDto.highlighted = false);
}
