import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import {useState} from 'react'
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, ArticleStateType, OptionType, defaultArticleState, } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Spacing } from '../spacing';

interface ArticleParamsFormProps {
	setState: (value: ArticleStateType | ((prev: ArticleStateType) => ArticleStateType)) => void;
}

export const ArticleParamsForm = ({setState} : ArticleParamsFormProps) => {
	const [open, setOpen] = useState(false)
	const [fontFamily, setFontFamily] = useState<OptionType>(fontFamilyOptions[0]);
	const [fontSize, setFontSize] = useState<OptionType>(fontSizeOptions[0]);
	const [fontColor, setFontColor] = useState<OptionType>(fontColors[0])
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(backgroundColors[0])
	const [width, setWidth] = useState<OptionType>(contentWidthArr[0])

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setState(
			{
				fontFamilyOption:fontFamily,
				fontColor:fontColor,
				fontSizeOption:fontSize,
				backgroundColor:backgroundColor,
				contentWidth:width
			}
		)
	}

	const reset = () => {
		setBackgroundColor(defaultArticleState.backgroundColor)
		setFontColor(defaultArticleState.fontColor)
		setFontFamily(defaultArticleState.fontFamilyOption)
		setFontSize(defaultArticleState.fontSizeOption)
		setWidth(defaultArticleState.contentWidth)
		setState(
			{
				fontFamilyOption:defaultArticleState.fontFamilyOption,
				fontColor:defaultArticleState.fontColor,
				fontSizeOption:defaultArticleState.fontSizeOption,
				backgroundColor:defaultArticleState.backgroundColor,
				contentWidth:defaultArticleState.contentWidth
			}
		)
	}
	return (
		<>
			<ArrowButton open={open} setOpen={setOpen} />
			<aside
				className={clsx(styles.container, open && styles.container_open)}>
				<form className={styles.form} onSubmit={submit} onReset={reset}>
					<div className={styles.header}>Задайте параметры</div>
					<Spacing size={50} />
					<Select
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<Spacing size={50} />
					<RadioGroup
						selected={fontSize}
						name='radio'
						onChange={setFontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Spacing size={50} />
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Spacing size={50} />
					<Separator/>
					<Spacing size={50} />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Spacing size={50} />
						<Select
						selected={width}
						onChange={setWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<Spacing size={207} />
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
