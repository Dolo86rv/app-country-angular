import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input('Buscar');
  value = output<string>();
  initialValue = input<string>('');

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  //Efecto
  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 1000);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
